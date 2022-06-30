import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { Card, Image } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';

const CampusImage = ({ content }) => {
  const { image, image_scales, title } = content;
  let download = 'https://www.svgrepo.com/show/16149/building.svg';
  if (image || image_scales) {
    const base_image = image ? image : image_scales.image[0];
    const scale_name = 'preview';
    const scale = base_image.scales[scale_name];
    download = scale.download;
    if (download.startsWith('@@')) {
      download = `${content['@id']}/${download}`;
    }
  }
  return <Image src={download} alt={title} wrapped ui={false} />;
};

const CampusBlockView = (props) => {
  const { data } = props;
  const campus =
    data.href !== undefined && data.href.length === 1 ? data.href[0] : null;
  return (
    <>
      {campus && (
        <Card>
          <CampusImage content={campus} />
          <Card.Header>
            <UniversalLink href={campus['@id']}>{campus.title}</UniversalLink>
          </Card.Header>
          <Card.Description>{campus.description}</Card.Description>
        </Card>
      )}
    </>
  );
};

export default withBlockExtensions(CampusBlockView);
