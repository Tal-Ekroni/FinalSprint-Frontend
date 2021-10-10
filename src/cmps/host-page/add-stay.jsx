import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AddStayBasicInfo } from './add-stay-basic-info';
import { AddStayFloorPlan } from './add-stay-floor-plan';
import { AddStayProfile } from './add-stay-profile';
import { onAddStay } from '../../store/stay.actions'
import { AddStayMap } from './add-stay-map';
import { TextField } from '@material-ui/core';
import { TextareaAutosize } from "@material-ui/core";
import Select from 'react-select';
import noImg from '../../assets/img/no-img.png'
class _AddStay extends React.Component {
    state = {
        newStay: {
            name: '',
            assetType: '',
            assetSpace: '',
            summary: '',
            uniqueStay: false,
            imgUrls: [noImg, noImg, noImg, noImg, noImg],
            price: '',
            capacity: '',
            amenities: [],
            labels: [],
            loc: {
                country: '',
                countryCode: '',
                address: '',
                lat: '',
                lng: ''
            },
            host: '',
            reviews: []
        },
        selectedTab: 'get-start'

    }
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;
        this.setState(prevState => ({ ...prevState, newStay: { ...this.state.newStay, [field]: value } }))
    }
    handleAddressChange = (address) => {
        this.setState(prevState => ({ ...prevState, newStay: { ...this.state.newStay, loc: address } }))
    }
    handleSelectChange = (target) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ ...prevState, newStay: { ...this.state.newStay, [field]: value } }))
    }
    handleMultiSelectChange = (target) => {
        var lastName = null
        if (target.length > 0) {
            const field = target[0].name
            lastName = field
            const labels = target.map(label => {
                return label.value;
            }) || [];
            this.setState({ newStay: { ...this.state.newStay, [field]: labels } }, () => {
            });
        } else {
            this.setState({ newStay: { ...this.state.newStay, [lastName]: [] } }, () => {
            });
        }

        // this.setState(prevState => ({ ...prevState, newStay: { ...this.state.newStay, [field]: value } }), () => { console.log(this.state); })
    }
    onAddsStay = (ev) => {
        ev.preventDefault()
        const { newStay } = this.state
        const { _id, fullname, ImgUrl } = this.props.user
        newStay.host = { fullname, _id, ImgUrl }
        this.props.onAddStay(newStay)

        this.setState({
            newStay: {
                name: '',
                assetType: '',
                assetSpace: '',
                summary: '',
                uniqueStay: false,
                imgUrls: [noImg, noImg, noImg, noImg, noImg],
                price: '',
                capacity: '',
                amenities: [],
                labels: [],
                loc: {
                    country: '',
                    countryCode: '',
                    address: '',
                    lat: '',
                    lng: ''
                },
                host: '',
                reviews: []
            }
        })
        this.props.history.push('/explore')
    }
    onUploadImg = (ev) => {
        const CLOUD_NAME = 'dkbfdybze'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        const file = ev.target.files[0]
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "ewa9mksh")
        return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                const state = this.state
                const ImgUrl = res.url
                state.newStay.imgUrls.push(ImgUrl)
                this.setState((state))
            })
            .catch(err => console.error(err))
    }
    render() {
        const { imgUrls, name, assetSpace, assetType, capacity, summary, price, amenities } = this.state.newStay
        console.log('imgUrls', imgUrls);
        const spaceOptions = [
            { name: 'assetSpace', value: 'An entire place', label: 'An entire place' },
            { name: 'assetSpace', value: 'A private room', label: 'A private room' },
            { name: 'assetSpace', value: 'A shared room', label: 'A shared room' },
        ];

        const assetTypeOptions = [
            { name: 'assetType', value: 'Duplex', label: 'Duplex' },
            { name: 'assetType', value: 'Villa', label: 'Villa' },
            { name: 'assetType', value: 'Loft', label: 'Loft' },
            { name: 'assetType', value: 'Farm', label: 'Farm' },
            { name: 'assetType', value: 'Cabin', label: 'Cabin' },
        ];

        const ameintiesOptions = [
            { name: 'amenities', value: 'TV', label: 'TV' },
            { name: 'amenities', value: 'Wifi', label: 'Wifi' },
            { name: 'amenities', value: 'Kitchen', label: 'Kitchen' },
            { name: 'amenities', value: 'Smoking allowed', label: 'Smoking allowedarm' },
            { name: 'amenities', value: 'Cooking basics', label: 'Cooking basics' },


        ];
        const style = {
            margin: '20px 0',
            padding: '20px',
            width: '100%',
            height: ' 150px',
            resize: 'none',
            borderRadius: '13px',
            borderColor: ' #bdbcbc',
            fontFamily: "circular-book",
            fontSize: "1rem"
        }
        if (!imgUrls) return (<div>Loading</div>)
        return (
            <div className="add-stay-container">
                <div>
                    <h1>Add stay!</h1>
                </div>


                <div className="add-stay-form-container flex" onSubmit={this.onAddsStay}>
                    <form className="add-stay-form">
                        <section className="add-basic-info-container flex align-center">
                            <div className="add-stay-name-container">
                                <img src="" alt="" />
                                <label className="add-line" htmlFor="">Stay name</label>
                                <TextField required type="text" autoComplete="off" value={name} name="name" placeholder="Asset name..." onChange={this.handleChange} />

                            </div>
                            <div className="add-stay-location-container">
                                <AddStayMap handleAddressChange={this.handleAddressChange} />
                            </div>

                        </section>
                        <section className="add-stay-imgs-container flex">
                            <div className="add-stay-imgs flex">
                                <div className="primary-img square-ratio" style={{ backgroundImage: `url(${imgUrls[0]})` }}>
                                    <input type="file" placeholder="Upload Image" name="imgUrls" onChange={this.onUploadImg} /></div>
                                {/* <div className="add-small-imgs-container flex column space-between">
                                    <div className="new-stay-img square-ratio"><input type="file" value={imgUrls[1]} name="imgUrls" onChange={this.onUploadImg} /></div>
                                    <div className="new-stay-img square-ratio"><input type="file" value={imgUrls[2]} name="imgUrls" onChange={this.onUploadImg} /></div>
                                </div>
                                <div className="add-small-imgs-container flex column space-between">
                                    <div className="new-stay-img square-ratio"><input type="file" value={imgUrls[3]} name="imgUrls" onChange={this.onUploadImg} /></div>
                                    <div className="new-stay-img square-ratio"><input type="file" value={imgUrls[4]} name="imgUrls" onChange={this.onUploadImg} /></div>
                                </div> */}
                            </div>

                        </section>
                        <section className="add-stay-details-container flex ">
                            <div className="add-form-line flex align-center space-between">
                                <label className="add-line" htmlFor="">Capacity</label>
                                <TextField required type="number" value={capacity} name="capacity" placeholder="Capacity..." onChange={this.handleChange} />
                            </div>
                            <div className="add-form-line flex align-center space-between">
                                <label className="add-line" htmlFor="">Asset space</label>
                                <Select
                                    required
                                    placeholder="Space type"
                                    onChange={this.handleSelectChange}
                                    name="assetSpace"
                                    className="add-stay-select"
                                    value={assetSpace}
                                    options={spaceOptions}
                                />
                            </div>
                            <div className="add-form-line flex align-center space-between">
                                <label className="add-line" htmlFor="">What is your asset type?</label>
                                <Select
                                    required
                                    placeholder="Asset type"
                                    onChange={this.handleSelectChange}
                                    name="assetType"
                                    className="add-stay-select"
                                    value={assetType}
                                    options={assetTypeOptions}
                                />
                            </div>
                            <div className="add-form-line flex align-center space-between">
                                <TextField required type="number" value={price} name="price" placeholder="Price" onChange={this.handleChange} />
                                <label className="add-line" htmlFor="">/per night</label>
                            </div>

                        </section>
                        <section className="add-stay-summary">
                            <div className="add-desc-line flex column  space-between">
                                <label className="add-line" htmlFor="">Describe your asset</label>
                                <TextareaAutosize
                                    required
                                    style={style}
                                    value={summary}
                                    placeholder="Describe your asset..."
                                    className="asset-desc-input"
                                    onChange={this.handleChange}
                                    name="summary"
                                    autoComplete="off" />
                            </div>
                        </section>
                        <section className="add-amenities-line-container ">

                            <div className="add-amenities-line flex align-center space-between">
                                <label className="add-amenities-label" htmlFor="">Choose your asset amenities</label>
                                <Select
                                    required
                                    onChange={this.handleMultiSelectChange}
                                    placeholder="Select amenities"
                                    name="amenities"
                                    isMulti
                                    className="add-stay-select"
                                    value={amenities}
                                    options={ameintiesOptions}
                                  />
                            </div>
                        </section>
                        <button className=" add-page-btn add-stay-btn">
                            Add Stay
                        </button>
                    </form>

                </div>
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
const mapDispatchToProps = {
    onAddStay
}


export const AddStay = withRouter(connect(mapStateToProps, mapDispatchToProps)(_AddStay))