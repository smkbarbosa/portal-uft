/**
 * CampusView view component.
 * @module components/View/CampusView
 */

import React from 'react';
import { Grid, Card, Image, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import EmailWidget from '@plone/volto/components/theme/Widgets/EmailWidget';
import ListCard from '../ListCard/ListCard';

const PreviewImage = ({ content }) => {
  const { image, image_caption } = content;
  const scale_name = 'preview';
  const scale = image.scales[scale_name];
  const { download, heigth, width } = scale;
  return (
    <Image
      src={download}
      alt={image_caption}
      height={heigth}
      size={width}
    ></Image>
  );
};
/**
 * CampusView view component class.
 * @function CampusView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const CampusView = (props) => {
  const { content } = props;

  return (
    <Segment>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Card fluid>
              {content.image && (
                <div className="image">
                  <PreviewImage content={content} />
                </div>
              )}
              <Card.Content>
                {content.title && (
                  <Card.Header>Campus: {content.city.title}</Card.Header>
                )}
                {content.description && (
                  <Card.Description>{content.description}</Card.Description>
                )}
              </Card.Content>
              <Card.Content extra>
                <div>
                  {content.email && (
                    <div>
                      <EmailWidget value={content.email} />
                    </div>
                  )}
                </div>
                <div>
                  {content.extension && <div>Ramal: {content.extension}</div>}
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <ListCard list={content.persons} nameList={'Equipe'} icon="user" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
CampusView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.object,
    city: PropTypes.object,
    persons: PropTypes.array,
    email: PropTypes.string.isRequired,
    extension: PropTypes.string.isRequired,
  }).isRequired,
};

export default CampusView;
