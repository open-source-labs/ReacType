import { ProjectController } from '../interfaces';
import { Projects } from '../models/reactypeModels';

// array of objects, objects inside
type Projects = { project: {} }[];

const projectController: ProjectController = {
  // saveProject saves current workspace to database
  saveProject: (req, res, next) => {
    // pull project name and project itself from body
    const { name, project, userId, username, comments } = req.body;
    // create createdBy field for the document
    const createdAt = Date.now();
    // pull ssid from cookies for user id
    Projects.findOneAndUpdate(
      // looks in projects collection for project by user and name
      { name, userId, username},
      // update or insert the project
      { project, createdAt, comments },
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

  // gets all of current user's projects
  getProjects: (req, res, next) => {
    const { userId } = req.body;
    Projects.find({ userId }, (err, projects: Projects) => {
      if (err) {
        return next({
          log: `Error in projectController.getProjects: ${err}`,
          message: {
            err: 'Error in projectController.getProjects, check server logs for details'
          }
        });
      }
      // so it returns each project like it is in state, not the whole object in DB
      res.locals.projects = projects.map((elem) => elem.project);
      return next();
    });
  },

  // delete project from database **currently not integrated into app**
  deleteProject: (req, res, next) => {
    // pull project name and userId from req.body
    const { name, userId } = req.body;
    Projects.findOneAndDelete({ name, userId }, null, (err, deleted) => {
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
