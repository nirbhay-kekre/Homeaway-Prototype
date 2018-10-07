import React, {Component} from 'react'
import './search.css'

class ImageSlider extends Component{
    render(){
        return (
            <div id={"carouselPropertyIndicators_"+this.props.index} className="carousel slide " data-interval="false">
                <ol className="carousel-indicators">
                    {
                        this.props.images.map((image, index) =>
                            <li data-target="#carouselPropertyIndicators" data-slide-to={index} ></li>)
                    }
                </ol>
                <div className="carousel-inner">
                    {
                        this.props.images.map((image, index) => {
                            return (
                                <div className={"carousel-item" + (index === 0 ? " active" : "")} style={{height: this.props.fixedHeight? this.props.fixedHeight:""}}>
                                    <img className="auto-fit d-block w-100" src={image} alt={"slide_" + index} />
                                </div>
                            )
                        })
                    }
                </div>
                <a className="carousel-control-prev" href={"#carouselPropertyIndicators_"+this.props.index} role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href={"#carouselPropertyIndicators_"+this.props.index} role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}

export default ImageSlider;