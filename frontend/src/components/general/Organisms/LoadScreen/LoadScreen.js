import React from "react";
import './styles.scss'

export const LoadScreen = () => (
  <div className="loadscreen">
    <div className="load-9">
      <div className="spinner">
        <div className="bubble-1"></div>
        <div className="bubble-2"></div>
      </div>
    </div>
  </div>
)

export const LoadObject = (props) => (
  <div className={`${props.objectclass}`}>
    <div className="load-3">
    <div className="line"></div>
    <div className="line"></div>
    <div className="line"></div>
    </div>
  </div>
)
