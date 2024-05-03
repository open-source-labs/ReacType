import Project from '../graphQL/resolvers/query';
import { MarketplaceController } from '../interfaces';
import { Projects, Users } from '../models/reactypeModels';
import mongoose from 'mongoose';

// array of objects, objects inside
type Projects = { project: {} }[];

const marketplaceController: MarketplaceController = {
  /**
   * Middleware function that finds and returns all published projects from the database
   * @return sends the entire project document to frontend
   */
  getPublishedProjects: (req, res, next) => {
    Projects.find({ published: true }, (err, projects) => {//removed the typing for now for projects: since its the mongodb doc
      if (err) {
        return next({
          log: `Error in marketplaceController.getPublishedProjects: ${err}`,
          message: {
            err: 'Error in marketplaceController.getPublishedProjects, check server logs for details'
          }
        });
      }
      // returns the entire project document as an array
      // need to convert each project document to an object
      const convertedProjects = projects.map((project) => {
        return project.toObject({ minimize: false });
      });
      res.locals.publishedProjects = convertedProjects;
      return next();
    });
  },

  /**
   * 
   * Middleware function that publishes (and saves) a project to the database
   * @return sends the updated entire project document to the frontend
   */
  publishProject: async (req, res, next) => {
    const { _id, project, comments, name } = req.body;
    const username = req.cookies.username;
    const userId = req.cookies.ssid;
    const createdAt = Date.now();

    try{
      if (mongoose.isValidObjectId(_id)) {
        const noPub = {...project}
        delete noPub.published;
        delete noPub._id;
        const publishedProject = await Projects.findOneAndUpdate
          (        // looks in projects collection for project by Mongo id
            { _id },
            // update or insert the project
            { project: noPub, createdAt, published: true, comments, name, userId, username },
            // Options:
            // upsert: true - if none found, inserts new project, otherwise updates it
            // new: true - returns updated document not the original one
            { upsert: true, new: true }
          );
        res.locals.publishedProject = publishedProject;
        return next();
      }else{

        const noId = {...project};
        delete noId._id;  //removing the empty string _id from project
        delete noId.published;
        const publishedProject = await Projects.create( { project: noId, createdAt, published: true, comments, name, userId, username })
        res.locals.publishedProject = publishedProject.toObject({ minimize: false });
        return next();
      }
    }
    catch {

      // we should not expect a user to be able to access another user's id, but included error handling for unexpected errors
      return next({
        log: 'Error in marketplaceController.publishProject', 
        message: {
          err: 'Error in marketplaceController.publishProject, check server logs for details'
        }
      })
    }
  },

  /**
   * 
   * Middleware function that marks a project as unpublished in the database
   * @return sends the updated project to the frontend
   */
  unpublishProject: (req, res, next) => {
    const { _id } = req.body;
    const userId = req.cookies.ssid;
    //check if req.cookies.ssid matches userId
    
    try {
      Projects.findOneAndUpdate({ _id, userId }, {published: false}, { new: true }, (err, result) => {
        if (err || result === null) {
          return next({
            log: `Error in marketplaceController.unpublishProject: ${err || null}`,
            message: {
              err: 'Error in marketplaceController.unpublishProject, check server logs for details'
            }
          });
        }
        res.locals.unpublishedProject = result.toObject({ minimize: false });
        return next();
      });
    }
    catch {
      // we should not expect a user to be able to access another user's id, but included error handling for unexpected errors
      return next({
        log: `Error in marketplaceController.unpublishProject`,
        message: {
          err: 'Error in marketplaceController.unpublishProject, userId of project does not match cookies.ssid'
        }
      })

    }
  }, 

  /**
   * Middleware function that clones and saves project to user's library
   * 
   */
  cloneProject: async (req, res, next) => {
    // pulls cookies from request
    const userId = req.cookies.ssid;
    const username = req.cookies.username;
    try { // trying to find project, update its userId and username to a new project, then save it
      const originalProject = await Projects.findOne({ _id: req.params.docId }).exec();
      const updatedProject = originalProject.toObject({ minimize: false }); // minimize false makes sure Mongoose / MongoDB does not remove nested properties with values of empty objects {}
      updatedProject.userId = userId;
      updatedProject.project.forked = true; 
      updatedProject.published = false;
      updatedProject.forked = `Forked from ${updatedProject.username}`; // add forked tag with current project owner username
      updatedProject.username = username; // then switch to the cloning username
      delete updatedProject._id; // removes the old project id from the object
      updatedProject.createdAt = Date.now();
      const clonedProject = await Projects.create(updatedProject);
      res.locals.clonedProject = clonedProject.toObject({ minimize: false }); // need to convert back to an object to send to frontend, again make sure minimize is false
      return next();
    }
    catch (err) {
      return next({
        log: `Error in marketplaceController.cloneProject: ${err}`,
        message: {
          err: 'Error in marketplaceController.cloneProject, check server logs for details'
        }
      });
    }
  },
};
export default marketplaceController;
