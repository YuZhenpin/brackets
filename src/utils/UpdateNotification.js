/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window, Mustache */

/**
 *  Utilities functions for displaying update notifications
 *
 */
define(function (require, exports, module) {
    "use strict";

    var Dialogs              = require("widgets/Dialogs"),
        DefaultDialogs       = require("widgets/DefaultDialogs"),
        ExtensionManager     = require("extensibility/ExtensionManager"),
        PreferencesManager   = require("preferences/PreferencesManager"),
        NativeApp            = require("utils/NativeApp"),
        Strings              = require("strings"),
        UpdateDialogTemplate = require("text!htmlContent/update-dialog.html"),
        UpdateListTemplate   = require("text!htmlContent/update-list.html");

    // make sure the global brackets variable is loaded
    require("utils/Global");

    // duration of one day in milliseconds
    var ONE_DAY = 1000 * 60 * 60 * 24;

    // duration of two minutes in milliseconds
    var TWO_MINUTES = 1000 * 60 * 2;

    // Extract current build number from package.json version field 0.0.0-0
    var _buildNumber = Number(/-([0-9]+)/.exec(brackets.metadata.version)[1]);

    // Init default last build number
    PreferencesManager.stateManager.definePreference("lastNotifiedBuildNumber", "number", 0);

    // Init default last info URL fetch time
    PreferencesManager.stateManager.definePreference("lastInfoURLFetchTime", "number", 0);

    // Time of last registry check for update
    PreferencesManager.stateManager.definePreference("lastExtensionRegistryCheckTime", "number", 0);
    // Data about available updates in the registry
    PreferencesManager.stateManager.definePreference("extensionUpdateInfo", "Array", []);

    PreferencesManager.convertPreferences(module, {
        "lastNotifiedBuildNumber": "user",
        "lastInfoURLFetchTime": "user",
        "updateInfo": "user"
    }, true);

    // URL to load version info from. By default this is loaded no more than once a day. If
    // you force an update check it is always loaded.

    // Information on all posted builds of Brackets. This is an Array, where each element is
    // an Object with the following fields:
    //
    //  {Number} buildNumber Number of the build
    //  {String} versionString String representation of the build number (ie "Release 0.40")
    //  {String} dateString Date of the build
    //  {String} releaseNotesURL URL of the release notes for this build
    //  {String} downloadURL URL to download this build
    //  {Array} newFeatures Array of new features in this build. Each entry has two fields:
    //      {String} name Name of the feature
    //      {String} description Description of the feature
    //
    // This array must be reverse sorted by buildNumber (newest build info first)

    /**
     * @private
     * Flag that indicates if we've added a click handler to the update notification icon.
     */
    var _addedClickHandler = false;

    /**
     * Calculate state of notification everytime registries are downloaded - no matter who triggered the download
     */
    function _onRegistryDownloaded() {
    }

    /**
     * Check for updates. If "force" is true, update notification dialogs are always displayed
     * (if an update is available). If "force" is false, the update notification is only
     * displayed for newly available updates.
     *
     * If an update is available, show the "update available" notification icon in the title bar.
     *
     * @param {boolean} force If true, always show the notification dialog.
     * @param {Object} _testValues This should only be used for testing purposes. See comments for details.
     * @return {$.Promise} jQuery Promise object that is resolved or rejected after the update check is complete.
     */
    function checkForUpdate(force, _testValues) {
        var result = new $.Deferred();
        return result.reject().promise();
    }

    /**
     * Launches both check for Brackets update and check for installed extensions update
     */
    function launchAutomaticUpdate() {
        // launch immediately and then every 24 hours + 2 minutes
        //checkForUpdate();
        //checkForExtensionsUpdate();
        //window.setInterval(checkForUpdate, ONE_DAY + TWO_MINUTES);
    }

    // Events listeners
    ExtensionManager.on("registryDownload", _onRegistryDownloaded);

    // Define public API
    exports.launchAutomaticUpdate = launchAutomaticUpdate;
    exports.checkForUpdate        = checkForUpdate;
});
