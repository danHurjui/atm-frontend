import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import React from 'react'
import Container from 'react-bootstrap/Container'
import axios from "axios"
import Col from "react-bootstrap/Col"

class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProcess: null
    };

  }
  url = "http://127.0.0.1:8000/getTickets/?emailAddress=danhurjui24@gmail.com";

  componentDidMount = () => {
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
       
        console.log(data['data'])
        this.setState({
          dataProcess: data['data'],
     
        });

      })
      .catch((error) => console.error("FETCH ERROR: ", error))
  };


  render() {
    if (!this.state.dataProcess)
      return null;
    return (
      <>
        <Container>
          <h1>This is my list of tickets for next week: </h1>
          <CardGroup>
              {this.state.dataProcess.map((dataP, k) => (
                  <Col key={k} xs={12} md={4} lg={3}>
                  <Card border="primary" className="mb-2">
                  <Card.Header>{dataP.Id}</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      {dataP.Title}
                    </Card.Title>
                    <Card.Text>
                      {dataP.Description}
                    </Card.Text>
                    <Card.Text>
                      Priority:{dataP.Priority}
                    </Card.Text>
                    <Card.Link href={dataP.Link}> Link to Jira</Card.Link>
                  </Card.Body>
                  </Card>
                  </Col>      
              ))}
          </CardGroup>
        </Container>
      </>
    )
  }
}



export default Tickets;