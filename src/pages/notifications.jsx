import { Component } from "react";
import { connect } from 'react-redux'
import { loadUser } from '../store/user.actions'
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class _NotificationsPage extends Component {
    state = {
        user: null
    }
    async componentDidMount() {
        const { user } = this.props
        if (user) {
            try {
                await this.props.loadUser(user._id)
            } catch (err) {
                console.log('error', err);
            }
        }
    }

    getData = (timeStamp) => {
        var time = new Date(timeStamp);
        var day = "0" + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();
        var formattedTime = day.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
        return formattedTime
    }
    render() {
        const { user } = this.props
        const columns = [
            {
                name: "txt",
                label: "Notifications",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "createdAt",
                label: "Time",
                options: {
                    filter: true,
                    sort: true
                }
            },
        ];

        const options = {
            filter: true,
            filterType: "dropdown",
        };

     

        const data = [
            {
                byUser: { fullName: "Davit Pok", imgurl: ' ' },
                createdAt: this.getData(Date.now() - 1500),
                stayId: "",
                txt: "Reserved you stay"
            },
        ];
        return (
            <main className="notifications-page-container  main-container">
                <section className="page-padding">
                    <div className="notifications-title-container">
                        <h1>Notifications</h1>
                    </div>
                    {user && <section className="notifications-container">
                        <MUIDataTable
                            title={"Notifications list"}
                            data={data}
                            columns={columns}
                            options={options}
                            
                        />
                    </section>}
                </section>
            </main>
        )
    }

}
function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    loadUser
}


export const NotificationsPage = connect(mapStateToProps, mapDispatchToProps)(_NotificationsPage)