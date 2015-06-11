/**
 * This file provided by Facebook is for non-commercial testing and evaluation purposes only.
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

app.set('port', (process.env.PORT || 3000));
app.use('/', router);
router.use('/', express.static(path.join(__dirname, 'public')));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/notes.json', function(req, res) {
  fs.readFile('notes.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

router.post('/notes.json', function(req, res) {
  fs.readFile('notes.json', function(err, data) {
    var notes = JSON.parse(data);
    notes.push(req.body);
    fs.writeFile('notes.json', JSON.stringify(notes, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(notes);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
