import  { Component } from 'react';
import TextField from '@mui/material/TextField';


class InputField extends Component {
    constructor(props){
        super();


    }

    render(){
        return(
            <TextField
                id="outlined-required" 
                fullWidth
                required
                label={this.props.label}
                type="text"
                name={this.props.fieldName}
                value={this.props.value}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.props.onChangefunct}
                onBlur={this.props.onBlurfunct}
              />
              
        )
    }

}

export default InputField;


