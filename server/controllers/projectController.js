const { Projects } = require('../models/reactypeModels');
const projectController = {};

// saveProject saves current workspace to database

projectController.saveProject = (req, res, next) => {
  console.log('Inside projectController.saveProject...');
  // pull project name and project itself from body
  const { name, project } = req.body;
  // pull ssid from cookies for user id
  const userId = req.cookies.ssid;
  Projects.findOneAndUpdate(
    { name, userId },
    // pushes the saved project into projects array of project
    { project },
    // this options returns as result the new project that was saved, otherwise result would be the projects array before it was updated
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
        console.log('Successful saveProject');
        return next();
      }
    }
  );
};

// gets all of current project's projects

projectController.getProjects = (req, res, next) => {
  console.log('Inside projectController.getProjects...');
  const userId = req.cookies.ssid;
  Projects.find({ userId }, (err, projects) => {
    if (err) {
      return next({
        log: `Error in projectController.getProjects: ${err}`,
        message: {
          err: `Error in projectController.getProjects, check server logs for details`
        }
      });
    } else {
      console.log('Successful getProjects');
      res.locals.projects = projects;
      return next();
    }
  });
};

module.exports = projectController;
