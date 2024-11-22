import subprocess
import functools
from os import walk
import json
import subprocess
import threading
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash
import os
from .db import get_db
bp=Blueprint('kratos',__name__,'/')

def run_subprocess(command):
    process=subprocess.Popen(command,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)

@bp.route('/')
def home():
    return render_template("base.html")

@bp.route('/ld')
def ld():
    """SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, 'static', 'json/spectro_data.json')
    data = json.load(open(json_url))"""
    return render_template('ld.html')

@bp.route('/arm')
def arm():
    return render_template('arm.html')

@bp.route('/ldgas')
def ldgas():
    return render_template('gas_sensor.html')
