from collections import defaultdict
from kitconcept import api
from plone.restapi.services import Service


class RosterGet(Service):
    """Return a roster of Persons in a Campus."""

    def reply(self):
        context = self.context
        persons = context.persons()
        result = defaultdict(list)
        for person in persons:
            person_id = person.id
            result[person_id[0]].append(api.content.serialize(person, summary=True))
        return result
