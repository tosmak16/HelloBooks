import React from 'react';
import { CardTitle, Card } from 'react-materialize';

class BooksPhoto extends React.Component {
  render() {
    return (
      <div className="col m10 offset-m2 col l10 offset-l2 col s12 main">
        <h4 className="page-header">Latest Books</h4>
        <hr />
        <div className="row placeholders">
          <div className="col m5 col l3 col s12 placeholder ">
            <Card
              className="small"
              header={ <CardTitle image={ require('../../../public/img/l2.jpg') }>Card Title</CardTitle> }
              actions={ <a href="#">This is a Link</a> }
            >
              I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.
            </Card>
          </div>
          <div className="col m5 col l3 col s12 placeholder ">
            <Card
              className="small"
              header={ <CardTitle image={ require('../../../public/img/l2.jpg') }>Card Title</CardTitle> }
              actions={ <a href="#">This is a Link</a> }
            >
              I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.
            </Card>
          </div>
          <div className="col m5 col l3 col s12 placeholder ">
            <Card
              className="small"
              header={ <CardTitle image={ require('../../../public/img/l2.jpg') }>Card Title</CardTitle> }
              actions={ <a href="#">This is a Link</a> }
            >
              I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.
            </Card>
          </div>
          <div className="col m5 col l3 col s12 placeholder ">
            <Card
              className="small"
              header={ <CardTitle image={ require('../../../public/img/l2.jpg') }>Card Title</CardTitle> }
              actions={ <a href="#">This is a Link</a> }
            >
              I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.
            </Card>
          </div>

        </div>
      </div>
    );
  }
}

export default BooksPhoto;
