(function () {
    app.beginUndoGroup("Caída de hoja suave");

    var comp = app.project.activeItem;
    if (!(comp && comp instanceof CompItem)) {
        alert("Abre una composición y selecciona al menos una capa.");
        return;
    }

    var layers = comp.selectedLayers;
    if (!layers || layers.length === 0) {
        alert("Selecciona una o más capas.");
        return;
    }

    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (!(layer instanceof AVLayer)) {
            continue;
        }

        var pos = layer.property("Position");
        if (!pos) {
            continue;
        }

        var startPos = pos.value;
        var startTime = layer.inPoint;
        var fallDuration = 10.0;
        var fallDistance = 420 + Math.floor(Math.random() * 100);
        var driftRange = 60;
        var swayAmplitude = 24;
        var floatAmplitude = 10;
        var rotationAmplitude = 30;
        var seed = Math.round(Math.random() * 1000 + i * 100);

        var exprPos = "seedRandom(" + seed + ", true);\n" +
            "var startTime = " + startTime.toFixed(3) + ";\n" +
            "var duration = " + fallDuration.toFixed(3) + ";\n" +
            "var startPos = [" + startPos[0].toFixed(2) + ", " + startPos[1].toFixed(2) + "];\n" +
            "var t = clamp((time - startTime) / duration, 0, 1);\n" +
            "var fall = ease(t, 0, 1, 0, " + fallDistance + ");\n" +
            "var drift = Math.cos((time - startTime) * 0.48 + random(0, 6.283)) * " + driftRange + " * (1 - t * 0.7);\n" +
            "var sway = Math.sin((time - startTime) * 1.25 + random(0, 6.283)) * " + swayAmplitude + " * (1 - t * 0.4);\n" +
            "var floatY = Math.sin((time - startTime) * 2.3 + random(0, 6.283)) * " + floatAmplitude + " * (1 - t);\n" +
            "[startPos[0] + drift + sway, startPos[1] + fall + floatY];";

        pos.expression = exprPos;

        var rot = layer.property("Rotation");
        if (rot) {
            var exprRot = "seedRandom(" + seed + ", true);\n" +
                "var startTime = " + startTime.toFixed(3) + ";\n" +
                "var duration = " + fallDuration.toFixed(3) + ";\n" +
                "var t = clamp((time - startTime) / duration, 0, 1);\n" +
                "var wobble = Math.sin((time - startTime) * 2.5 + random(0, 6.283)) * " + rotationAmplitude + " * (1 - t * 0.8);\n" +
                "var spin = ease(t, 0, 1, 0, " + (20 + Math.floor(Math.random() * 30)) + ");\n" +
                "wobble + spin;";
            rot.expression = exprRot;
        }

        var opacity = layer.property("Opacity");
        if (opacity) {
            var exprOpacity = "var startTime = " + startTime.toFixed(3) + ";\n" +
                "var duration = " + fallDuration.toFixed(3) + ";\n" +
                "var t = clamp((time - startTime) / duration, 0, 1);\n" +
                "ease(t, 0, 1, 100, 88);";
            opacity.expression = exprOpacity;
        }
    }

    app.endUndoGroup();
})();
