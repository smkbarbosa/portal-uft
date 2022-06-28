ARG PLONE_VERSION=6.0.0a6
FROM plone/plone-backend:${PLONE_VERSION}

LABEL maintainer="Samuel Barbosa <contato@smkbarbosa.eti.br>" \
      org.label-schema.name="portal-uft-backend" \
      org.label-schema.description="Portal UFT backend image." \
      org.label-schema.vendor="Samuel Barbosa"

# Add local code
COPY . .

# Install local requirements and fix permissions
RUN ./bin/pip install -r requirements.txt \
    && chown -R plone: /app
