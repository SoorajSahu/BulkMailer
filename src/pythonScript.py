#! python3
import re, urllib.request, time, sys

emailRegex = re.compile(r'''
#example :
#something-.+_@somedomain.com
(
([a-zA-Z0-9_.+]+
@
[a-zA-Z0-9_.+]+)
)
''', re.VERBOSE)
        
#Extacting Emails
def extractEmailsFromUrlText(urlText):
    extractedEmail =  emailRegex.findall(urlText)
    allemails = []
    for email in extractedEmail:
        allemails.append(email[0])
    lenh = len(allemails)
    seen = set()
    for email in allemails:
        if email not in seen:  # faster than `word not in output`
            seen.add(email)
            print(email)



#HtmlPage Read Func
def htmlPageRead(nurl, i):
    try:
        
        headers = { 'User-Agent' : 'Mozilla/5.0' }
        request = urllib.request.Request(nurl, None, headers)
        response = urllib.request.urlopen(request)
        urlHtmlPageRead = response.read()
        urlText = urlHtmlPageRead.decode()    
        extractEmailsFromUrlText(urlText)
        for x in range(10, 180, 10):
          url=nurl+'&start='+str(x)
          time.sleep(2)          
          headers = { 'User-Agent' : 'Mozilla/5.0' }
          request = urllib.request.Request(url, None, headers)
          response = urllib.request.urlopen(request)
          urlHtmlPageRead = response.read()
          urlText = urlHtmlPageRead.decode()    
          extractEmailsFromUrlText(urlText)
          url=nurl
        
      

    except:
        pass
    
#EmailsLeechFunction
def emailsLeechFunc(url, i):
    
    try:
        htmlPageRead(url,i)
    except urllib.error.HTTPError as err:
        if err.code == 404:
            try:
                url = 'http://webcache.googleusercontent.com/search?q=cache:'+url
                htmlPageRead(url, i)
            except:
                pass
        else:
            pass    
      
# TODO: Open a file for reading urls
start = time.time()
url = 'https://www.google.com/search?q='

# Take input by argument

url +=  str(sys.argv[1])
#url += input('Enter emails : ')


emailsLeechFunc(url, 1)




