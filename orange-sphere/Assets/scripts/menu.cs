using UnityEngine;
using System.Collections;

public class menu : MonoBehaviour
{
    public GUISkin gui_skin;

    public int FIRST_LEVEL = 1;

    private Rect _gui_group = new Rect(0, 0, 500, 500);

    private Rect _gui_btn_start = new Rect(150, 70, 200, 65);
    private Rect _gui_btn_credits = new Rect(150, 150, 200, 65);
    private Rect _gui_btn_quit = new Rect(150, 230, 200, 65);

    private Rect _gui_lbl_credits = new Rect(20, 20, 460, 360);
    private Rect _gui_btn_quit2 = new Rect(150, 400, 200, 65);

    private enum STATES { MENU, CREDITS };
    private STATES _state = STATES.MENU;

    private string[] _button_names = { "0", "1", "2" };
    private int _index = 0;    

	void Start ()
    {
        _gui_group.x = (Screen.width - 500) * 0.5f;
        _gui_group.y = (Screen.height - 500) * 0.5f;
	}

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow))
        {
            _index--;
            if (_index < 0)
                _index = _button_names.Length - 1;
        }
        else if (Input.GetKeyDown(KeyCode.S) || Input.GetKeyDown(KeyCode.DownArrow))
        {
            _index++;
            if (_index >= _button_names.Length)
                _index = 0;
        }
    }

    void OnGUI()
    {
        GUI.skin = gui_skin;

        switch (_state)
        {
            case STATES.MENU:
                {
                    GUI.BeginGroup(_gui_group);

                    GUI.SetNextControlName(_button_names[0]);
                    if (GUI.Button(_gui_btn_start, "Play"))
                    {
                        Application.LoadLevel(FIRST_LEVEL);
                    }

                    GUI.SetNextControlName(_button_names[1]);
                    if (GUI.Button(_gui_btn_credits, "Credits"))
                    {
                        _state = STATES.CREDITS;
                    }

                    GUI.SetNextControlName(_button_names[2]);
                    if (GUI.Button(_gui_btn_quit, "Quit"))
                    {
                        Application.Quit();
                    }

                    GUI.EndGroup();

                    GUI.FocusControl(_button_names[_index]);

                    break;
                }
            case STATES.CREDITS:
                {

                    GUI.BeginGroup(_gui_group);

                    GUI.Label(_gui_lbl_credits, "One Game A Month #10\nDaniel Baumartz\nMyyyvothrr.de");

                    GUI.SetNextControlName("0");
                    if (GUI.Button(_gui_btn_quit2, "Back"))
                    {
                        _state = STATES.MENU;
                    }

                    GUI.EndGroup();

                    GUI.FocusControl("0");

                    break;
                }
        }
    }
}
