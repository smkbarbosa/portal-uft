/**
 * ListCard view component.
 * @module components/ShowCard/ShowCard
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, List } from 'semantic-ui-react';

/**
 * ListCard view component class.
 * @function ListCard
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const ListCard = ({ nameList, list, icon }) => {
  if (!list) return <div></div>;
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{nameList}</Card.Header>
        <Card.Description extra>
          {list.map((item) => (
            <List divided relaxed key={item.title}>
              <List.Item>
                <List.Icon name={icon} />
                <List.Content>
                  <List.Header>
                    <a href={item['@id']}>{item.title}</a>
                  </List.Header>
                  <List.Description>{item.description}</List.Description>
                </List.Content>
              </List.Item>
            </List>
          ))}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ListCard.propTypes = {
  nameList: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
};

export default ListCard;
