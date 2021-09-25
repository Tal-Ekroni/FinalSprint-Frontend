import React from 'react'
import { Select, MenuItem, InputLabel } from '@material-ui/core'
export class ExploreFilter extends React.Component {
    state = {
        filter: {
            isPrivate: ''
        }
    }
     
        handleChange = (ev) => {
            const field = ev.target.name
            const value = ev.target.value;
            console.log(ev);
            // this.setState({ filter: { ...this.state.filter, [field]: value } }, () => {
            //     this.props.filterStays(this.state.filter)
            // })

        }
    render() {
        return (
            <div className="explore-filter">
                <Select
                    disableUnderline
                    // value={this.state.filter.isPrivate}
                    onChange={this.handleChange} className="explore-select">
                    <MenuItem value="none" disabled>Type</MenuItem>
                    <MenuItem value={true}>Entrie Place</MenuItem>
                    <MenuItem value={false}>Private Room</MenuItem>

                </Select>
            </div>
        )
    }

}