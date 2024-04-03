# Configure les librairies selon le système d'opération 
import config_dev
config_dev.set_up()

from RPi import GPIO

def initialize_gpio(_mode):
    GPIO.setmode(_mode)

def setup_pin(pin, direction):
    """
    Configurer un pin GPIO en entrée ou en sortie.
    
    Args:
        pin (int): Le numéro du pin GPIO à configurer.
        direction (str): 'IN' pour entrée, 'OUT' pour sortie.

     GPIO.setup(18, GPIO.OUT)
    """
    pass

def write_pin(pin, state):
    """
    Écrire un état sur un pin GPIO configuré en sortie.
    
    Args:
        pin (int): Le numéro du pin GPIO à utiliser.
        state (bool): True pour HIGH, False pour LOW.

    GPIO.output(18, GPIO.HIGH)
    """
    pass

def read_pin(pin):
    """
    Lire l'état actuel d'un pin GPIO configuré en entrée.
    
    Args:
        pin (int): Le numéro du pin GPIO à lire.
        
    Returns:
        bool: True si l'état du pin est HIGH, False si LOW.

    GPIO.input(18, GPIO.HIGH)
    """
    pass

def cleanup_gpio():
    """
    Nettoyer les configurations GPIO.

    GPIO.cleanup()
    """
    pass