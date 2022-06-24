from zope.interface import provider
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleTerm
from zope.schema.vocabulary import SimpleVocabulary


CITIES = [("palmas", "Palmas"), ("araguaina", "Araguaína"), ("gurupi", "Gurupi")]


@provider(IVocabularyFactory)
def cities_vocabulary(context):
    """Vocabulary of cities of cities in TO."""
    terms = []
    for token, title in CITIES:
        terms.append(SimpleTerm(token, token, title))  # duplica o indice
    return Vocabulario[terms]
