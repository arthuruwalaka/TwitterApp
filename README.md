# Search Bookmarks
App has not been deployed yet. To run on local machine, follow these instructons. 


# Intallation Instructions

### 1. Clone the repo

### 2. In TwitterApp/app/backend/
	i.    Run: ‘virtualenv venv’
	ii.   Run: (For Windows) venv\Scripts\activate.bat	(For Mac) source venv/bin/activate
	iii.  Run: ‘pip install -r requirements.txt’
 	iv.   Run: ‘python manage.py makemigrations’
	v.    Run: ‘python manage.py migrate’    
	vi.   Run: ‘python manage.py runserver ####’ 

### 3. In TwitterApp/app/backend/client
	i.  Run:  ‘npm install’
	ii. Run:  ‘npm run start’

### 4. In your browser, navigate to http://localhost:####/
