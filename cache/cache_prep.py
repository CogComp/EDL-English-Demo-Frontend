'''
This cache_prep, so far, is used to create a cache for function 
getEnglish_EDL (line 25) in english_edl_demo_backend.py.
'''

import json
import hashlib
import requests

BASE_MULTILANG_EDL_HTTP = 'http://dickens.seas.upenn.edu:4002/api/eng_edl/'

#--------------------- Sample Sentences ---------------------

sample_dic = {
    "eng": [
		"Sigmund Freud was an Austrian neurologist and the founder of psychoanalysis, a clinical method for treating psychopathology through dialogue between a patient and a psychoanalyst. Freud was born to Galician Jewish parents in the Moravian town of Freiberg, in the Austrian Empire. He qualified as a doctor of medicine in 1881 at the University of Vienna. Freud lived and worked in Vienna, having set up his clinical practice there in 1886. In 1938, Freud left Austria to escape Nazi persecution. He died in exile in the United Kingdom in 1939.",
        "Barack Hussein Obama II is an American politician and attorney who served as the 44th president of the United States from 2009 to 2017. A member of the Democratic Party, Obama was the first African-American president of the United States. He previously served as a U.S. senator from Illinois from 2005 to 2008 and an Illinois state senator from 1997 to 2004.",
		"Mohandas Karamchand Gandhi was an Indian lawyer, anti-colonial nationalist, and political ethicist. He employed nonviolent resistance to lead the successful campaign for India's independence from British rule, and in turn inspired movements for civil rights and freedom across the world. The honorific Mahātmā, first applied to him in 1914 in South Africa, is now used throughout the world.",
		"Two bombs were detonated in Boston."
    ]
}


#-------------------- Annontation Function --------------------
def getEnglish_EDL(lang,text):
	input = {"lang":lang,"text":text}
	headers = {'content-type': 'application/json'}
	try:
		res_out = requests.post(BASE_MULTILANG_EDL_HTTP, data = json.dumps(input) , headers=headers)
		#print('===============================')
		#print(BASE_MULTILANG_EDL_HTTP, input, headers)
		#print('-------------------------------')
		print(res_out.text)
		#print('-------------------------------')
		# res = res_out.json()
		# return {}
		res_json = json.loads(res_out.text)
		# res_json = json.loads(res)
	except:
		res_json=None

	return res_json


#-------------------- Create Cache for MultiLang_EDL-----------------

if __name__ == "__main__":

    cache_EDL = {}
    for lang in sample_dic.keys():
        cache_EDL[lang] = {}

        for text in sample_dic[lang]:
            hash_value = hashlib.sha1(text.encode()).hexdigest()
            if hash_value in cache_EDL[lang].keys():
                raise ValueError('COLLISION ERROR: Different text has same hash value!')
            else:
                cache_EDL[lang][hash_value] = {}
                cache_EDL[lang][hash_value]['text'] = text #the raw text is not included in the return of getMULTILANG_EDL(lang,text)
                cache_EDL[lang][hash_value]['res_json'] = getEnglish_EDL(lang,text)

    
    cache_EDL_json = json.dumps(cache_EDL, indent=4)
    with open('cache/cache_EDL.json', 'w') as json_file:
        json_file.write(cache_EDL_json)
 
print("Success in creating cache_EDL!")
