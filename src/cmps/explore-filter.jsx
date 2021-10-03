import React from 'react'
import DynamicModal from 'react-modal'

export class ExploreFilter extends React.Component {
    state = {
        modals: {
            placeTypeIsOpen: false
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value;


    }
    openPlaceType = () => {
        console.log('ok');
        this.setState({ modals: { tplaceTypeIsOpen: !this.state.modals.placeTypeIsOpen } })
    }
    render() {
        const { placeTypeIsOpen } = this.state.modals
        return (
            <div className="explore-filter flex">
                <div className="sort-type">
                    <button onClick={this.openPlaceType}>Type of place</button>
                    <DynamicModal>
                        <h1>Place types</h1>
                        <h1>Place types</h1>
                        <h1>Place types</h1>
                        <h1>Place types</h1>
                        <h1>Place types</h1>
                        <h1>Place types</h1>
                        <h1>Place types</h1>
                    </DynamicModal>
                </div>

            </div>
        )
    }

}


