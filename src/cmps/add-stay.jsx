import React from 'react'
import { connect } from 'react-redux'
import { Field, Form, Formik } from "formik";
import GoogleSelect from '@material-ui/core/Select';
import { MenuItem, Button } from "@material-ui/core";
import { Select } from "formik-material-ui";

class _AddStay extends React.Component {
    state = {
        newStay: {
            name: '',
            assetType: '',
            summary: '',
            uniqueStay: false,
            imgUrls: [],
            price: null,
            capacity: null,
            amenities: [],
            loc: {
                country: null,
                countryCode: null,
                address: null,
                lat: null,
                lng: null
            },
            reviews: []
        }
    }
    componentDidMount() {
        this.setState({
            newStay: {
                name: '',
                assetType: '',
                summary: '',
                uniqueStay: false,
                imgUrls: [],
                price: null,
                capacity: null,
                amenities: [],
                loc: {
                    country: null,
                    countryCode: null,
                    address: null,
                    lat: null,
                    lng: null
                },
                reviews: []
            }
        })
    }
    handleChange = ({ target }) => {
        console.log('target', target);
    }
    onAddsStay = () => {
        console.log('add');
    }
    render() {
        return (
            <div>
                <Formik
                    initialValues={this.state.newToy}
                    onSubmit={this.onAddsStay}
                >
                    <div>
                        <Form className="add-form flex column space-between">.
                            <div className="add-form-line flex align-center">
                                <label htmlFor="">Give you stay a name</label>
                                <Field type="text" name="name" placeholder="Stay Name..." autoComplete="off" autoCapitalize="on" onChange={this.handleChange} />
                            </div>
                            <div className="add-form-line flex  align-center">
                                <label htmlFor="">Give you stay a price</label>
                                <Field type="number" name="price" placeholder="Stay price per night..." onChange={this.handleChange} />
                            </div>
                            {/* <GoogleSelect name="inStock" defaultValue={true} onChange={this.handleChange} >
                                <MenuItem >Yes</MenuItem>
                                <MenuItem >No</MenuItem>
                            </GoogleSelect> */}
                            {/* <Select
                                className="select"
                                value={labels}
                                isMulti
                                onChange={this.handleSelectChange}
                                options={options}
                            /> */}
                            <Button
                                variant={'contained'}
                                color={'primary'}
                                type="submit"
                            >
                                Add Stay
                            </Button>
                        </Form>

                    </div>
                </Formik>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        stays: state.stayModule.stays
    }
}
// const mapDispatchToProps = {
//     loadUser
// }


export const AddStay = connect(mapStateToProps)(_AddStay)
