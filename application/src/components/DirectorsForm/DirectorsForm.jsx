import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SaveIcon from '@material-ui/icons/Save';
import withHocs from './DirectorsFormHoc';
import { useState } from 'react';


const initState = {
  name: "",
  age: "",
  nameError: "",
  ageError: ""
}

class DirectorsForm extends React.Component {

  handleClose = () => { 
    this.props.onClose(); };

    
  validate = () => {
    let nameError = "";
    let ageError = ""

    if (!this.props.selectedValue.name) {
      nameError = 'Cant be empty';
    }

    if (!this.props.selectedValue.age) {
      ageError = 'Cant be empty';
    }

    return !nameError && !ageError;
  };

  
  handleSubmit = event => {
    const isValid = this.validate();
    if(!isValid) {
      event.preventDefault();
    }
  }

  handleSaveLocal = (event) => {
    const { selectedValue, onClose, addDirector, updateDirector } = this.props;
    const { id, name, age } = selectedValue;
    if(!this.validate()) {
      console.log("Director Form cant be empty ");
      event.preventDefault();
      return false;
    }
    console.log("saved");
    id ? updateDirector({ id, name, age: Number(age) }) : addDirector({ name, age: Number(age) });
    onClose();
  };

  render() {
    const { classes, open, handleChange, selectedValue = {} } = this.props;
    const { name, age } = selectedValue;

    return (
      <Dialog onClose={this.handleClose} open={open} aria-labelledby="simple-dialog-title">
        <DialogTitle className={classes.title} id="simple-dialog-title">Director information</DialogTitle>
        <form  className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            value={name}
            onChange={handleChange('name')}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-rate"
            label="Age"
            className={classes.textField}
            value={age}
            onChange={handleChange('age')}
            type="number"
            margin="normal"
            variant="outlined"
          />
          <div className={classes.wrapper}>
            <Button onClick={this.handleSaveLocal} variant="contained" color="primary" className={classes.button}>
              <SaveIcon /> Save
            </Button>
          </div>
        </form>
      </Dialog>
    );
  }
};

  export default withHocs(DirectorsForm);
