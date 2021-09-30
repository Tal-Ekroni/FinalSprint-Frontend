import React from 'react'
import Modal from 'react-modal'
import { Select, MenuItem, Button } from '@material-ui/core'
// const myStyle = {
//     overlay: {
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'transperent'
//     },
//     content: {
//         position: 'relative',
//         border: '1px solid #ccc',
//         background: '#fff',
//         overflow: 'none',
//         WebkitOverflowScrolling: 'touch',
//         borderRadius: '14px',
//         outline: 'none',
//         height: '78px',
//         width: '85px',
//         left: '33px',
//         top: '197px',
//         textAlign:'center'
//     }
// }

export class ExploreFilter extends React.Component {
    state = {
        modals: {
            placeTypeIsOpen: false
        },
        filter: {
            isPrivate: ''
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value;
       

    }
    openPlaceType = (val) => {
        this.setState({ modals: { ...this.state.modals, placeTypeIsOpen: val } })
    }
    render() {
        const { placeTypeIsOpen } = this.state.modals
        return (
            <div className="explore-filter flex">
                <div className="place-type">
                {/* onClick={() => this.openPlaceType(true)} */}
                    <Button >Place Type</Button>
                    <Modal
                        isOpen={placeTypeIsOpen}
                        // style={myStyle}
                        className="place-modal"
                    >
                        <h2 style={{ fontSize: '8px' }}>Entire place</h2>
                        <h2 style={{ fontSize: '8px' }}>Private Room</h2>
                        <Button >Filter</Button>
                        {/* onClick={() => this.openPlaceType(false)} */}
                    </Modal>
                </div>
                <Button>Place Type</Button>
                <Button>Place Type</Button>
            </div>
        )
    }

}


