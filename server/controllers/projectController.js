const { Projects } = require('../models/reactypeModels');
const projectController = {};

// saveProject saves current workspace to database

projectController.saveProject = (req, res, next) => {
  // pull project name and project itself from body
  const { name, project, userId } = req.body;
  // pull ssid from cookies for user id
  Projects.findOneAndUpdate(
    // looks in projects collection for project by user and name
    { name, userId },
    // update or insert the project
    { project },
    // Options:
    // upsert: true - if none found, inserts new project, if found, updates project
    // new: true - returns updated document not the original one
    { upsert: true, new: true },
    (err, result) => {
      if (err) {
        return next({
          log: `Error in projectController.saveProject: ${err}`,
          message: {
            err: `Error in projectController.saveProject, check server logs for details`
          }
        });
      } else {
        res.locals.savedProject = result;
        return next();
      }
    }
  );
};

// gets all of current user's projects

projectController.getProjects = (req, res, next) => {
  const { userId } = req.body;
  Projects.find({ userId }, (err, projects) => {
    if (err) {
      return next({
        log: `Error in projectController.getProjects: ${err}`,
        message: {
          err: `Error in projectController.getProjects, check server logs for details`
        }
      });
    } else {
      // so it returns each project like it is in state, not the whole object in DB
      res.locals.projects = projects.map(elem => elem.project);
      return next();
    }
  });
};

// delete project from database **currently not integrated into app**

projectController.deleteProject = (req, res, next) => {
  // pull project name and userId from req.body
  const { name, userId } = req.body;
  Projects.findOneAndDelete({ name, userId }, (err, deleted) => {
    if (err) {
      return next({
        log: `Error in projectController.deleteProject: ${err}`,
        message: {
          err: `Error in projectController.deleteProject, check server logs for details`
        }
      });
    } else {
      res.locals.deleted = deleted;
      return next();
    }
  });
};

module.exports = projectController;
