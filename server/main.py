from newspaper import Article
from transformers import pipeline
import transformers
import sys
import json

def get_article(link):
    article_info = {}
    try:
        article = Article(link)
        article.download()
        article.parse()
        #getting article info from Newspaper3K
        article_info["title"] = article.title
        if len(article.authors) == 0:
            article_info["authors"] = ""
        else:
            article_info["authors"] = article.authors[0]
        date = article.publish_date
        if date != None:
            article_info["publish_date"] = date.strftime("%B") + " " + str(date.day) + ", " + str(date.year)
        else:
            article_info["publish_date"] = ""
        article_info["image"] = article.top_image
        article_info["text"] = article.text

        return article_info
    except:
        return article_info

def qa(text, sentiment):
    nlp = pipeline("question-answering", model="AlexKay/xlm-roberta-large-qa-multilingual-finedtuned-ru")

    effects = []
    dosage = ""
    dosage_max = 0

    question = "To whom is coffee good for"
    if sentiment == "NEGATIVE":
        question = "To whom is coffee bad for"

    text_parse = text.split("\n")

    for i in text_parse:
        if i != "":
            effect = nlp({
                "question": "What is the effect of coffee",
                "context": i
            })

            if effect['score'] > 0.4:
                x = effect['answer'].strip(",.!? ")
                effects.append(x)

            dose = nlp({
                "question": "How much coffee do we have to drink",
                "context": i
            })
            if dose['score'] > dosage_max:
                dosage_max = dose['score']
                dosage = dose['answer']


    return {"dosage": dosage, "effects": effects}

def gender_age(title):
    classifier = pipeline("zero-shot-classification", model='cross-encoder/nli-deberta-v3-base')
    sent = title
    gender_labels = ["male", "female", "none"]
    age_labels = ["child", "adult", "senior"]
    res = classifier(sent, gender_labels)
    res_age = classifier(sent, age_labels)
    
    gender = "none"
    age = "none"

    if (res["scores"][0] > 0.6):
        gender = res["labels"][0]
    if (res_age["scores"][0] > 0.6):
        age = res_age["labels"][0]
    
    return {"age": age, "gender": gender}



def sentiment(title):
    sentiment_pipeline = pipeline("sentiment-analysis", model="siebert/sentiment-roberta-large-english")
    data = title
    return sentiment_pipeline(data)[0]

def main(link):
    result = {}

    article = get_article(link)
    result["article"] = article
    
    if len(article) == 0:
        print("error")
        return
    
    # result["classify"] = gender_age(article["title"].lower())
    result["sentiment"] = sentiment(article["title"])
    # result["qa"] = qa(article["text"], result["sentiment"])
    print(json.dumps(result))

main ("https://www.chroniclelive.co.uk/news/health/warning-drinking-coffee-before-breakfast-25592838")

# if __name__ == '__main__':
#     main(sys.argv[1])

