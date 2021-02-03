import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

import './ChartMovie.scss'

export default class ChartMovie extends Component {
  render () {
    return (
      <div className="card-based-movie">
        <h5>Avengers: End Game</h5>
        <Line
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Weekly',
                data: [3, 4, 4, 1, 8],
                borderColor: 'blue',
                backgroundColor: 'transparent'
              },
              {
                label: 'Monthly',
                data: [2, 4, 4, 1, 8],
                borderColor: 'blue',
                backgroundColor: 'transparent'
              },
              {
                label: 'Yearly',
                data: [2, 5, 4, 1, 8],
                borderColor: 'blue',
                backgroundColor: 'transparent'
              }
            ]
          }}
          height={400}
          width={500}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    max: 8,
                    stepSize: 1
                  }
                }
              ]
            }
          }}
        />
      </div>
    )
  }
}
