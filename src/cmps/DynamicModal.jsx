import React from "react"
export class DynamicModal extends React.Component {

    render() {
        return (

            <div>
                {this.props.children}
            </div>
        )
    }
}