const storage = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }
};

export default storage;
```

## 📄 **src/App.js**

This is the working version from the preview. **Copy the code from the artifact named `carenest-app`** on the right side - it's the complete working App.js with access code protection!

---

## 📄 **For the Component Files:**

The individual component files are in these artifacts (scroll up in our conversation):
- `carenest-homescreen` 
- `carenest-profilescreen`
- `carenest-profileform`
- `carenest-dailylog`
- `carenest-medication`
- `carenest-appointment`
- `carenest-emergency`
- `carenest-summary`
- `carenest-settings`
- `carenest-privacy`

Each artifact has the complete code ready to copy!

---

## 📄 **.gitignore**
```
node_modules/
build/
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.vscode/
.idea/
