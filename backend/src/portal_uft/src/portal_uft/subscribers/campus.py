from kitconcept import api
from portal_uft import logger
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


def _add_group(obj: Campus):
    """Add group when the Campus is created"""
    groupname = f"group_{obj.getId()}"
    group = api.group.create(
        groupname=groupname,
        title=f"group_{obj.title}",
        description=f"Users from the Campus {obj.title}",
    )
    logger.info(f"Created user group {groupname} ({group})")


def added(obj: Campus, event: ObjectAddedEvent):
    """A new Campus was added to the site"""
    # Atualiza tags do objeto
    _update_tags(obj)
    _add_group(obj)


def modified(obj: Campus, event: ObjectModifiedEvent):
    """A Campus has been modifieded"""
    _update_tags(obj)
