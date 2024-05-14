import { ProjectController } from '../interfaces';
import { Projects } from '../models/reactypeModels';
import { State } from '../../app/src/interfaces/Interfaces';

// array of objects, objects inside
type Projects = { project: {} }[];

const projectController: ProjectController = {
  /**
   * Middleware function to save the current workspace to the database.
   *
   * @callback SaveProjectMiddleware
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function in the stack.
   * @returns {void}
   */
  saveProject: (req, res, next): void => {
    // pull project name and project itself from body
    const { name, project, comments } = req.body;
    const username = req.cookies.username;
    const userId = req.cookies.ssid;
    //deleted published from project
    const noPub = { ...project };
    delete noPub.published;
    // create createdBy field for the document
    const createdAt = Date.now();
    // pull ssid from cookies for user id
    Projects.findOneAndUpdate(
      // looks in projects collection for project by user and name
      { name, userId, username },
      // update or insert the project
      { project: noPub, createdAt, published: false, comments },
      // Options:
      // upsert: true - if none found, inserts new project, if found, updates project
      // new: true - returns updated document not the original one
      { upsert: true, new: true },
      (err, result) => {
        if (err) {
          return next({
            log: `Error in projectController.saveProject: ${err}`,
            message: {
              err: 'Error in projectController.saveProject, check server logs for details'
            }
          });
        }
        res.locals.savedProject = result;
        return next();
      }
    );
  },

  /**
   * Middleware function to retrieve all projects of the current user from the database.
   *
   * @callback GetProjectsMiddleware
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function in the stack.
   * @returns {void}
   */
  getProjects: (req, res, next): void => {
    const userId = req.cookies.ssid;
    Projects.find(
      { userId },
      (
        err,
        projects: Array<{ _id: string; published: boolean; project: object }>
      ) => {
        if (err) {
          return next({
            log: `Error in projectController.getProjects: ${err}`,
            message: {
              err: 'Error in projectController.getProjects, check server logs for details'
            }
          });
        }
        // so it returns each project like it is in state, not the whole object in DB
        res.locals.projects = projects.map(
          (elem: {
            _id: string;
            name: string;
            published: boolean;
            project: object;
          }) => ({
            _id: elem._id,
            name: elem.name,
            published: elem.published,
            ...elem.project
          })
        );
        return next();
      }
    );
  },

  /**
   * Middleware function to delete a project from the database.
   *
   * @callback DeleteProjectMiddleware
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function in the stack.
   * @returns {Promise<void>}
   */
  deleteProject: async (req, res, next): Promise<void> => {
    // pull project name and userId from req.body
    const { _id } = req.body;
    const userId = req.cookies.ssid;
    // try {
    //   const response = await Projects.findOneAndDelete({ _id: _id, username: userId });
    //   res.locals.deleted = response;
    //   return next()
    // } catch (err) {
    //   return next({
    //     log: `Error in projectController.deleteProject: ${err}`,
    //     message: {
    //       err: 'Error in projectController.deleteProject, check server logs for details'
    //     }
    //   });
    // }
    // @Denton, rewrote the above syntax for async await, would be good to test this further
    Projects.findOneAndDelete({ _id, userId }, null, (err, deleted) => {
      if (err) {
        return next({
          log: `Error in projectController.deleteProject: ${err}`,
          message: {
            err: 'Error in projectController.deleteProject, check server logs for details'
          }
        });
      }
      res.locals.deleted = deleted;
      return next();
    });
  }
};
export default projectController;
