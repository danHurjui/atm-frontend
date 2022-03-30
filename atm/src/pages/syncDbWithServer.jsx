
import React from "react";
import axios from "axios"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Container from 'react-bootstrap/Container'

class SimpleBackdrop extends React.Component {
render(){
    return (
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={this.props.showBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}


class MyVerticallyCenteredModal extends React.Component {
  render() {
    return (
      <Modal
        show={this.props.show} onHide={() => this.props.onHide({ msg: 'Cross Icon Clicked!' })}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {this.props.body}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class SyncDbWithServer extends React.Component {

  url = "http://127.0.0.1:8000/syncdb/?emailAddress=danhurjui24@gmail.com";

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showBackDrop: false,
      title: 'Sync Db',
      body: '',
      data: []
    };
  }

  handleClose = (fromModal) => {

    window.location.reload(false);
    this.setState({
      show: false,
      showBackDrop: false
    });
  };

  callYourAPI = () => {
    this.setState({
      showBackDrop:true,
    })

    axios.get(this.url, { crossDomain: true })
      .then((response) => {
        if (response) {

          return response;

        }
        else {
          console.log("FAILURE");
          throw new Error("NETWORK RESPONSE ERROR");
        }
      })
      .then(data => {

        console.log(this.state.show)
        if (data['data'][0]['status'] === 'ok') {
          this.setState({
            show: true,
            title: 'Sync DB on Server',
            body: 'ok',
            data: ['data'][0]['status'],
            showBackDrop: false
          });

        }
        else {
          this.setState({
            show: true,
            title: 'Sync DB on Server NOT DONE',
            body: 'NOK',
            data: ['data'][0]['status'],
            showBackDrop: false
          });

        }
      })
      .catch((error) => console.error("FETCH ERROR: ", error))
  };

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.callYourAPI} >
          Sync DB
        </Button>

        <MyVerticallyCenteredModal
          show={this.state.show}
          title={this.state.title}
          body={this.state.body}
          data={this.state.data}
          onClick={this.handleClose}
          onHide={this.handleClose} />

        <SimpleBackdrop
        showBackDrop={this.state.showBackDrop}
        />
      </div>
    );
  }
}

export default SyncDbWithServer;