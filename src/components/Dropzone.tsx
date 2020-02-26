import React from "react";
import Dropzone from "react-dropzone";

const IPC = require('electron').ipcRenderer;

class FileDrop extends React.Component { 
  onDrop = (file:any) => {
    const { path } = file[0];
    console.log(path);
  };

  render() {
    const maxSize = 5242880;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '675px',
        }}
      >
        <Dropzone
          // onDrop is prop that takes a function that will execute once a file has been created
          onDrop={this.onDrop}
          // which type of files you want to accept
          accept="image/png, image/jpg"
          // minimum size you want to accept to be uploaded (in bytes)
          minSize={0}
          // maximum size you want to accept to be uploaded (in bytes)
          maxSize={maxSize}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragReject,
            rejectedFiles
          }) => {
            const isFileTooLarge =
              rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
            return (
              <div 
                {...getRootProps()}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: '#999',
                  fontSize: '44px',
                  width: '800px',
                  height: '600px',
                  padding: '20px',
                  border: '5px dashed #333',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                <input {...getInputProps()} />
                {!isDragActive && "Click here or drag an image to start!"}
                {isDragActive && ! isDragReject && "Uploading..."}
                {isDragReject && "File type not accepted, sorry!"}
                {isFileTooLarge && "File is too large."}
              </div>
            );
          }}
        </Dropzone>
      </div>
    );
  }
}

export default FileDrop;