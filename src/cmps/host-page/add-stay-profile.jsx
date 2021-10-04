import { TextareaAutosize, TextField } from "@material-ui/core";
import { Field } from "formik";

import React from "react";
import Select from 'react-select';
import { AddStayMap } from "./add-stay-map";

const labelsOptions = [
    { name: 'labels', value: 'Building', label: 'Building' },
    { name: 'labels', value: 'City life', label: 'City life' },
    { name: 'labels', value: 'Parks', label: 'Parks' },
    { name: 'labels', value: 'Resturants', label: 'Resturants' }
];

export class AddStayProfile extends React.Component {
    render() {
        const { handleChange, handleMultiSelectChange } = this.props
        const { labels, name, imgUrls } = this.props.state
        return (
            <div className="add-basic-info-container">
                <div className="add-form-line flex align-center space-between">
                    <label className="add-line" htmlFor="">Give your stay a name!</label>
                    <TextField type="text" autoComplete="off" value={name} name="name" placeholder="Asset name..." onChange={handleChange} />
                </div>
                <div className="add-form-line flex align-center space-between">
                    <label className="add-line" htmlFor="">Upload images here</label>
                    <TextField type="number" value={imgUrls} autoComplete="off" name="capacity" placeholder="Asset capacity..." />
                </div>
                <div className="add-form-line flex align-center space-between">
                    <label className="add-line" htmlFor="">Choose your asset lebels</label>
                    <Select
                        onChange={handleMultiSelectChange}
                        placeholder="Select labels"
                        name="labels"
                        isMulti
                        className="add-stay-select"
                        value={labels}
                        options={labelsOptions}
                    />
                </div>
                <div className="add-form-line flex align-center space-between">
                    <label className="add-line" htmlFor="">Enter your stay location</label>
                    <TextField type="text" value={imgUrls} autoComplete="off" name="capacity" placeholder="Asset capacity..." />

                </div>
                <AddStayMap />
            </div>
        )
    }
}