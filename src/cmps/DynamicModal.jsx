import React from "react"
export class DynamicModal extends React.Component {

    render() {
        const styleClass = this.props.children.length ? this.props.children[0].props.className : this.props.children.props.className

        return (
            <div className={`dynamic-sort-modal ${styleClass}`}>
                {this.props.children}
            </div>
        )
    }
}