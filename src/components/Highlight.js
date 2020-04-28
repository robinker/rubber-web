import React, {useState} from 'react'
import { Carousel } from 'react-bootstrap'
function Hightlight() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  }

  return (
      <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://sme.ktb.co.th/sme/imageAction.action?imageId=1217"
          height="500" width="250"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.thairath.co.th/media/Dtbezn3nNUxytg04OS5JqoGOuVsWBj6JBzj3x0lRVPGv0W.jpg"
          height="500" width="250"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide</h3>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://s.isanook.com/ns/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL25zLzAvdWQvMzg1LzE5MjU4ODIvbmV3czAwLmpwZw==.jpg"
          height="500" width="250"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide</h3>
          {/* <p> Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
export default Hightlight