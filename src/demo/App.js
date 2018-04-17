import React, { Component } from 'react';
import Demo from './Demo';
import Tour from '../index';
import './styles.css';
import '../styles/reactour.scss';
import Text from './Text';
import Glitch from './Glitch';
import Tooltip from './Tooltip';
import { Link } from './Button';

class App extends Component {
    constructor() {
        super();
        this.state = {
            isTourOpen: false,
            isShowingMore: false,
        };
    }

  toggleShowMore = () => {
      this.setState(prevState => ({
          isShowingMore: !prevState.isShowingMore,
      }));
  };

  closeTour = () => {
      this.setState({ isTourOpen: false });
  };

  openTour = () => {
      this.setState({ isTourOpen: true });
  };

  render() {
      const { isTourOpen, isShowingMore } = this.state;
      return (
          <div>
              <Demo
                  openTour={this.openTour}
                  toggleShowMore={this.toggleShowMore}
                  isShowingMore={isShowingMore}
              />
              <Tour
                  onRequestClose={this.closeTour}
                  steps={tourConfig}
                  isOpen={isTourOpen}
              />
          </div>
      );
  }
}

class Test extends Component {
    render() {
        const {
            onClick,
            index,
        } = this.props;

        return (
            <b onClick={onClick}>
                {index}
            </b>
        )
    }
};

const tourConfig = [
    {
        selector: '[data-tut="reactour__iso"]',
        content: 'Ok, let\'s start with the name of the Tour that is about to begin.',
    },
    {
        selector: '[data-tut="reactour__logo"]',
        content: 'And this is our cool bus...',
    },
    {
        selector: '[data-tut="reactour__copy"]',
        content: `Keep in mind that you could try and test everything during the Tour. 
      For example, try selecting the highlighted text…`,
    },
    {
        selector: '[data-tut="reactour__style"]',
        content: () =>
            (<div>
                <Glitch data-glitch="Styled">Styled</Glitch>
                <Text color="#e5e5e5">
          The <Tooltip data-tooltip="this helper ⬇">tourist guide</Tooltip>{' '}
          could be dressed in any way, using custom components, styles and so
          on…
                </Text>
                <Text color="#373737" size=".7em" style={{ marginTop: '.7em' }}>
                    <Link
                        href="http://codepen.io/lbebber/full/ypgql/"
                        color="dark"
                        nospaces
                    >
            Text effect
                    </Link>{' '}
          by{' '}
                    <Link href="https://twitter.com/lucasbebber" color="dark" nospaces>
            Lucas Bebber
                    </Link>
                </Text>
            </div>),
        style: {
            backgroundColor: 'black',
            color: 'white',
        },
    },
    {
        selector: '[data-tut="reactour__goTo"]',
        content: ({ goTo }) =>
            (
                <div>
                    If you wanna go anywhere, skipping places, it is absolutely possible.
                    <br /> "Oh, I forgot something inside the bus…"{' '}
                    <button
                        style={{
                            border: '1px solid #f7f7f7',
                            background: 'none',
                            padding: '.3em .7em',
                            fontSize: 'inherit',
                            display: 'block',
                            cursor: 'pointer',
                            margin: '1em auto',
                        }}
                        onClick={() => goTo(1)}
                    >
                        Please go back to <span role="img" aria-label="bus">🚌</span>
                    </button>
                </div>
            ),
    },
    {
        selector: '[data-tut="reactour__position"]',
        content: () =>
            (<Text>
        The <Tooltip data-tooltip="this helper ⬇">tourist guide</Tooltip> could
        be positioned where you want.
                <br /> In this case will try to stay in the <strong>left side</strong>{' '}
        if there's available space, otherwise will{' '}
                <strong>auto position</strong>.
            </Text>),
        position: 'left',
    },
    {
        selector: '[data-tut="reactour__scroll"]',
        content:
      'Probably you noted that the Tour scrolled directly to the desired place, and you could control the time also…',
    },
    {
        selector: '[data-tut="reactour__scroll--hidden"]',
        content: 'Also when places are pretty hidden…',
    },
    {
        selector: '[data-tut="reactour__action"]',
        content:
      'When arrived on each place you could fire an action, like… (look at the console)',
        action: () =>
            console.log(`
                  ------------🏠🏚---------
      🚌 Arrived to explore these beautiful buildings! 🚌
                  ------------🏠🏚---------
   🚧 This action could also fire a method in your Component 🚧
    `),
    },
    {
        selector: '[data-tut="reactour__state"]',
        content:
      'And the Tour could be observing changes to update the view, try clicking the button…',
        observe: '[data-tut="reactour__state--observe"]',
    },
];

export default App;
