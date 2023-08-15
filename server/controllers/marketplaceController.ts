import { MarketplaceController } from '../interfaces';
import { Projects } from '../models/reactypeModels';

// array of objects, objects inside
type Projects = { project: {} }[];

const marketplaceController: MarketplaceController = {

  getPublishedProjects: (req, res, next) => {
    const { userId } = req.body;
    Projects.find({ userId }, (err, projects: Projects) => {
      if (err) {
        return next({
          log: `Error in marketplaceController.getPublishedProjects: ${err}`,
          message: {
            err: 'Error in marketplaceController.getPublishedProjects, check server logs for details'
          }
        });
      }
      // so it returns each project like it is in state, not the whole object in DB
      res.locals.publishedProjects = projects.map((elem) => elem.project);
      return next();
    });
  },

  publishProject: (req, res, next) => {
    const { name, project, userId, username, comments, createdAt } = req.body;


    // what is the best way to find the project?
    // need to check if the session id matches the userid to authorize the publishing
    Projects.findOneAndUpdate(
      // looks in projects collection for project by name, userId, username, and created date
      { name, userId, username, createdAt },
      // update or insert the project
      { published: true },
      // Options:
      // new: true - returns updated document not the original one
      { new: true },
      (err, result) => {
        if (err) {
          return next({
            log: `Error in marketplaceController.publishProject: ${err}`,
            message: {
              err: 'Error in marketplaceController.publishProject, check server logs for details'
            }
          });
        }
        res.locals.publishedProject = result;
        return next();
      }
    );
  },



  // // retool for marketplace front
  // getProjects: (req, res, next) => {
  //   const { userId } = req.body;
  //   Projects.find({ userId }, (err, projects: Projects) => {
  //     if (err) {
  //       return next({
  //         log: `Error in projectController.getProjects: ${err}`,
  //         message: {
  //           err: 'Error in projectController.getProjects, check server logs for details'
  //         }
  //       });
  //     }
  //     // so it returns each project like it is in state, not the whole object in DB
  //     res.locals.projects = projects.map((elem) => elem.project);
  //     return next();
  //   });
  // },

  // remove published project: TODO
  unpublishProject: (req, res, next) => {
    // code needs to be tweaked
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
export default marketplaceController;
