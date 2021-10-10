import { Component } from "react";
import { connect } from 'react-redux'
import { loadUser, updateUser } from '../store/user.actions'
import MUIDataTable from "mui-datatables";
import { NavLink } from "react-router-dom";


class _NotificationsPage extends Component {
    state = {
        user: null,
    }

    async componentDidMount() {
        const { user } = this.props
        console.log('loggggg', user);
        if (user) {
            try {
                await this.props.loadUser(user._id)
            } catch (err) {
                console.log('error', err);
            }
        }
    }
    componentWillUnmount() {
        const { user } = this.props
        if (user?.notifications?.length) {
            const userUnreadNotifs = user.notifications.map(notif => { notif.isRead = true })
            this.props.updateUser({ ...user, notifications: userUnreadNotifs })
        }
    }
    onToggleIsRead = (notifIdx) => {
        const { user } = this.props
        user.notifications[notifIdx].isRead = !user.notifications[notifIdx].isRead
        this.props.updateUser(user)
    }

    getData = (notifications) => {
        // const { orders: notifications } = this.props
        console.log('notifications', notifications);
        const dataOrders = []
        let editedNotif
        if (notifications.length) {
            notifications.map((notif, idx) => {
                if (notif) {

                    editedNotif = {
                        notifTxt: `${notif?.txt} at ${notif.stay.name}`,
                        byUser: notif.byUser.fullname,
                        byUserImg: <div className="user-order-img-container flex align-center" >
                            <div>
                                <img src={`https://i.pravatar.cc/100?u=${notif.byUser._id.substr(notif.byUser._id.length - 9)}`} alt="user-icon" />
                            </div>
                            <p>{notif.byUser.fullname}</p>
                        </div>,
                        createdAt: <p>{notif.createdAt}</p>,
                        approveBtn: <div className="host-action-btns flex align-center">
                            <button onClick={() => { this.onToggleIsRead(idx) }} className={`"${notif.isRead ? 'unread' : 'read'} order-btn"`}>{notif.isRead ? 'Unread' : 'Read'}</button>
                            <button className="approve-order-btn">Remove</button>
                            <NavLink to={`stay/${notif.stay._id}`} className="approve-order-btn">Go to stay</NavLink>
                        </div>
                    }
                    dataOrders.unshift(editedNotif)
                    editedNotif=null
                }
            })
            console.log('data', dataOrders);
            return dataOrders
        }
    }
    render() {
        const { user } = this.props
        const columns = [
            {
                name: "byUserImg",
                label: "Name",
                options: {
                    filter: true,
                    sort: true
                }
            },
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
            },
            {
                name: "approveBtn",
                label: "Actions",
            },
        ];

        const options = {
            filter: true,
            filterType: "dropdown",
        };


        // let data = [];
        let data = this.props.user.notifications.length ? this.getData(this.props.user.notifications) : [];
        return (
            <main className="notifications-page-container  main-container">
                <section className="page-padding">
                    <div className="notifications-title-container">
                        <h1>Notifications</h1>
                    </div>
                    {user && data && <section className="notifications-container" >
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
    updateUser,
    loadUser
}


export const NotificationsPage = connect(mapStateToProps, mapDispatchToProps)(_NotificationsPage)