import React from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";

class _HostChart extends React.Component {
    state = {
        staysStatus: []
    }
    componentDidMount() {
        this.getStaysStatus()
    }
    getStaysStatus = () => {
        const { orders } = this.props.user
        var pendingOrders = orders.filter(order => { return order.status === 'pending' })
        var approvedOrders = orders.filter(order => { return order.status === 'approved' })
        this.setState({ staysStatus: [pendingOrders.length, approvedOrders.length] }, () => { console.log(this.state); })
    }
    render() {
        const { staysStatus } = this.state
        const staysData = {
            labels: ["Pending", "Approved"],
            datasets: [

                {
                    data: staysStatus,
                    width: 200,
                    backgroundColor: ["#6f019c", "#ff5a5f"],
                    borderColor: [
                        "#6f019c",
                        "#ff5a5f"
                    ],
                    borderWidth: 3
                }
            ]
        }
        return (
            <div>
                <div className="chart-container">
                    <h1>Orders Status</h1>
                    <Doughnut data={staysData} />
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}
// const mapDispatchToProps = {

// }


export const HostChart = connect(mapStateToProps)(_HostChart)