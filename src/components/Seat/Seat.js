import React, { Component } from "react";

import "./Seat.scss";

export default class Seat extends Component {
  state = {
    alfabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    seatNumber: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
  };
  render() {
    return (
      <table>
        <tbody>
          {this.state.alfabet.map((item, index) => {
            return (
              <tr key={index}>
                <td className="seats">{item}</td>
                {this.state.seatNumber.map((value, indexA) => {
                  return (
                    <React.Fragment key={indexA}>
                    {(`${item}${value}` === 'F11') ? (
                      <>
                      {this.props.soldSeat.some((sold) => sold.name === 'F11, F12') ? (
                        <td colSpan='2' className="check">
                        <input
                          type="checkbox"
                          onClick={() => this.props.data('F11, F12')}
                          name="seat"
                          className='seats-love'
                          disabled
                        />
                      </td>
                      ) : (
                        <td colSpan='2' className="check">
                        <input
                          type="checkbox"
                          onClick={() => this.props.data('F11, F12')}
                          name="seat"
                          className='seats-love'
                        />
                      </td>
                      )}
                      </>
                    ) : (`${item}${value}` === 'F12') ? null : (
                      <>
                      {this.props.soldSeat.some((sold) => sold.name === `${item}${value}`) ? (
                        <td className="check">
                        <input
                          type="checkbox"
                          onClick={() => this.props.data(`${item}${value}`)}
                          name="seat"
                          disabled
                        />
                      </td>
                      ) : (
                        <td className="check">
                          <input
                            type="checkbox"
                            onClick={() => this.props.data(`${item}${value}`)}
                            name="seat"
                          />
                        </td>
                      )}
                      </>
                    )}
                    {`${item}${value}` === `${item}7` ? <td className="seatGap"></td> : null}
                    </React.Fragment>
                  )
                })}
              </tr>
            )
          })}
          <tr className="seats-number">
            <td></td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td className="seatGap"></td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
