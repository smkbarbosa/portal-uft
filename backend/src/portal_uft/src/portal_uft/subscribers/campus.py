from kitconcept import api
from portal_uft.content.campus import Campus
from zope.lifecycleevent import ObjectAddedEvent
from zope.lifecycleevent import ObjectModifiedEvent


def _update_tags(obj: Campus):
    """Update tags on Campus Object"""
    vocab = api.vocabulary.get("portal_uft.vocabulary.cities")
    tags = set(obj.subject)
    city = obj.city
    term = vocab.getTermByToken(city)
    tags.add(f"Campus: {term.title}")
    obj.subject = tuple(tags)


def added(obj: Campus, event: ObjectAddedEvent):
    """A new Campus was added to the site"""
    # Atualiza tags do objeto
    _update_tags(obj)


def modified(obj: Campus, event: ObjectModifiedEvent):
    """A Campus has been modifieded"""
    _update_tags(obj)