using UnityEngine;
using System.Collections;

public class player : MonoBehaviour
{
    public float speed;
    public float jump_speed;

    private Vector3 _l;
    private Vector3 _r;
    private float _ray_dist = 0.6f;
    
	void Start ()
    {	
	}

    void Update()
    {
        if (Input.GetButtonDown("Back"))
            Application.LoadLevel(0);
    }

    void FixedUpdate()
    {
        rigidbody.AddForce(Input.GetAxis("Horizontal") * speed, 0, 0, ForceMode.Force);

        if (Input.GetButtonDown("Jump") && _is_grounded())
            rigidbody.AddForce(0, jump_speed, 0, ForceMode.Impulse);
    }

    void killed()
    {
        Application.LoadLevel(1);
    }

    private bool _is_grounded()
    {
        _l = transform.position;
        _l.x -= 0.5f;

        _r = transform.position;
        _r.x -= 0.5f;

        return Physics.Raycast(transform.position, -Vector3.up, _ray_dist) || Physics.Raycast(_l, -Vector3.up, _ray_dist) || Physics.Raycast(_r, -Vector3.up, _ray_dist);
    }
}
