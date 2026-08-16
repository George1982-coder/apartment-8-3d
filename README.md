# דירה מס' 8 — פרויקט Next.js

## מה זה
פרויקט Next.js קטן שמזהה אוטומטית אם המבקר נכנס מנייד או ממחשב
(בצד השרת, דרך middleware.ts) ומגיש את קובץ ה-3D הנכון:
- public/desktop.html
- public/mobile.html

## איך מריצים מקומית (לא חובה, אפשר לדלג ישר ל-Vercel)
npm install
npm run dev
פתח http://localhost:3000

## איך מעלים ל-Vercel (בלי טרמינל בכלל)
1. היכנס ל-vercel.com והירשם/התחבר (מומלץ עם GitHub).
2. אם אין לך עדיין את הפרויקט הזה ב-GitHub: העלה את כל התיקייה
   הזאת לריפו חדש ב-github.com (New repository -> Upload files).
3. חזור ל-Vercel -> Add New -> Project -> Import מהריפו שיצרת.
4. השאר את כל ההגדרות כברירת מחדל ולחץ Deploy.
5. תוך דקה תקבל קישור קבוע כמו: https://apartment-8-3d.vercel.app

זהו. כל פעם שתעלה שינוי ל-GitHub, Vercel יעדכן את האתר אוטומטית.
