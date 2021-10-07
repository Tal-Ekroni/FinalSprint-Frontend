import 'rheostat/initialize';
import React from 'react';
import Rheostat from 'rheostat';

export class PriceRangePicker extends React.Component {
    MyBackground = ({ style }) => {
        return (
            <div
                style={{
                    ...style,
                    backgroundColor: '#000',
                    height: 13,
                }}
            />
        );
    }
    render() {
        return (
            <div className="">
                <Rheostat
                    min={1}
                    max={100}
                    values={[1, 100]}
                    background={this.MyBackground}
                    style={{color:'red'}}
                />
                <ol>
                    <lh>Values</lh>
                    {[1, 100].map((value) => (
                        <li key={value}>
                            {value}
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}