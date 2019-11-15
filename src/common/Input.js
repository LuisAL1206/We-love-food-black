import React from 'react';

function Input({label, type, placeholder,change,value,required,name}){

    return(
        <div className="control-group">
            <div className="form-group col-xs-12 floating-label-form-group controls">
              <label>{label}</label>
              <input className="form-control" 
              name={name}
              type={type} 
              onChange={change}
              placeholder={placeholder}
              value={value}
              required={required}/>
              <p className="help-block text-danger"></p>
          </div>
        </div>
    );

}

export default Input;