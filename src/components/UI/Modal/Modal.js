import React from "react";
import {createPortal} from "react-dom";
import './Modal.css';

const modalRoot = document.getElementById( 'modal' );

class Modal extends React.Component {
    constructor( props ) {
        super( props );
        // We create an element div for this modal
      this.element = document.createElement( 'div' );
    }

    componentDidMount() {
        modalRoot.appendChild( this.element );
    }

    componentWillUnmount() {
        modalRoot.removeChild( this.element );
    }

    render() {
        return createPortal( this.props.children, this.element );
    }
}

export default Modal;