import sys


def set_up():
    # La plateforme du RaspberryPI 3
    targetPlatform = 'linux2' 

    # Si on lance ce code sur une autre plateforme, on adapte pour pouvoir tester l'implementation
    if (sys.platform != targetPlatform):
        import fake_rpi

        sys.modules['RPi'] = fake_rpi.RPi     # Faux RPi
        sys.modules['RPi.GPIO'] = fake_rpi.RPi.GPIO # Faux GPIO
