import { Component } from "react";
import { connect } from 'react-redux'
import { loadUser, updateUser } from '../store/user.actions'
import MUIDataTable from "mui-datatables";


class _NotificationsPage extends Component {
    state = {
        user: null,
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    async componentWillUnmount() {
        const { user } = this.props
        if (user?.notifications?.length) {
            const userUnreadNotifs = user.notifications.map(notif => ({ ...notif, isRead: true }))
            await this.props.updateUser({ ...user, notifications: userUnreadNotifs })
        
        }
        console.log('user', user);
    }

    render() {
        const { user } = this.props
        const columns = [
            // {
            //     name: "byUserImg",
            //     label: "Name",
            //     options: {
            //         filter: true,
            //         sort: true
            //     }
            // },
            {
                name: "notifTxt",
                label: "Notification",
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
            }
        ];

        const options = {
            filter: true,
            filterType: "dropdown",
        };

        console.log(user.notifications, 'uset notif');
        return (
            <main className="notifications-page-container  main-container">
                <section className="page-padding">
                    <div className="notifications-title-container">
                        <h1>Notifications</h1>
                    </div>
                    {user && <section className="notifications-container" >
                        <MUIDataTable
                            title={"Notifications list"}
                            data={user.notifications}
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
    updateUser,
    loadUser
}


export const NotificationsPage = connect(mapStateToProps, mapDispatchToProps)(_NotificationsPage)